import styled, { css } from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';
import { TooltipMode } from '@keen.io/ui-core';

export const PartialItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Value = styled.div`
  margin-left: 5px;
`;

export const TotalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
`;

export const PartialsContainer = styled.div<{
  mode: TooltipMode;
}>`
  padding: 10px 15px;

  ${(props) =>
    props.mode === 'dark' &&
    css`
      border-top: solid 1px ${transparentize(0.5, colors.white[500])};
    `};

  ${(props) =>
    props.mode === 'light' &&
    css`
      border-top: solid 1px ${transparentize(0.3, colors.gray[400])};
    `};

  ${PartialItem} + ${PartialItem} {
    margin-top: 5px;
  }
`;
