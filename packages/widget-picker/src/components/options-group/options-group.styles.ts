import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const Title = styled.div`
  color: ${colors.black[100]};
  font-family: 'Lato Bold', sans-serif;
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 4px;
`;

export const Item = styled.div<{ isActive: boolean }>`
  cursor: pointer;
  width: 110px;
  height: 37px;
  border: solid 1px ${colors.gray[300]};

  white-space: nowrap;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 13px;
  font-family: 'Lato Regular', sans-serif;
  color: ${colors.blue[500]};

  ${(props) =>
    props.isActive &&
    css`
      background: ${transparentize(0.7, colors.blue[100])};
    `}

  &:hover {
    background: ${transparentize(0.7, colors.blue[100])};
  }

  transition: background 0.2s linear;
`;

export const Group = styled.div`
  ${Item + Item} {
    margin-top: 3px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
