import styled from 'styled-components';
import { colors } from '@keen.io/colors';
import { transparentize } from 'polished';

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
  padding-bottom: 5px;
`;

export const Value = styled.div`
  margin-left: 10px;
`;

export const Point = styled.div<{
  color: string;
}>`
  width: 8px;
  height: 8px;
  margin-right: 6px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

export const SizeContainer = styled.div`
  border-top: 1px solid ${transparentize(0.3, colors.gray['400'])};
  padding-top: 5px;
  margin-top: 5px;
  margin-left: -15px;
  margin-right: -15px;
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  justify-content: space-between;
`;
