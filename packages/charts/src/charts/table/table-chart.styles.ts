import styled from 'styled-components';
import { colors } from '@keen.io/colors';

import { DRAG_CLASS } from './constants';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
`;

export const TableContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;

  .${DRAG_CLASS} {
    background: ${colors.gray[300]};
    width: 2px;
    opacity: 0.7;
  }

  .grip-lastgrip {
    display: none;
  }

  .grip-handle {
    margin-left: -1px;
    opacity: 0;
    transition: opacity 0.2s linear;
    background: ${colors.gray[300]};
    width: 2px;

    &:hover {
      opacity: 0.7;
    }
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  cursor: pointer;
  width: 100%;
  margin: 0;
`;

export const LeftOverflow = styled.div`
  height: 100%;
  width: 10px;
  background: transparent;
  position: absolute;
  top: 0;
  left: -10px;
  box-shadow: 0 4px 8px ${colors.gray['500']};
`;

export const RightOverflow = styled.div`
  height: 100%;
  width: 10px;
  background: transparent;
  position: absolute;
  top: 0;
  right: -10px;
  box-shadow: 0 -4px 8px ${colors.gray['500']};
`;
