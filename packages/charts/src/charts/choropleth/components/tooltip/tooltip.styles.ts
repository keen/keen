import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const PartialItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Value = styled.div`
  margin-left: 10px;
`;

export const TotalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
`;

export const PartialsContainer = styled.div`
  padding: 10px 15px;
  border-top: solid 1px ${transparentize(0.5, colors.white[500])};

  ${PartialItem} + ${PartialItem} {
    margin-top: 5px;
  }
`;
