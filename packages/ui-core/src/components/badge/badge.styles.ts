import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

export const Container = styled.div`
  display: inline-flex;
  align-items: stretch;
  justify-content: center;

  cursor: pointer;
`;

const backgroundMixin = (baseColor: string) => css`
  background-color: ${transparentize(0.7, baseColor)};

  transition: background-color 0.3s ease-in-out;

  ${Container}:hover & {
    background-color: ${transparentize(0.4, baseColor)};
  }
`;

type TextWrapperProps = {
  bgColor: string;
  textColor: string;
  removable?: boolean;
};

export const TextWrapper = styled.span<TextWrapperProps>`
  display: block;
  padding: 2px 4px;

  font-family: 'Lato Bold', sans-serif;
  font-size: 13px;
  line-height: 16px;
  color: ${props => props.textColor};

  border-radius: ${props => (props.removable ? '2px 0 0 2px' : '2px')};

  ${props => backgroundMixin(props.bgColor)}
`;

type IconWrapperProps = {
  bgColor: string;
};

export const IconWrapper = styled.div<IconWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 2px 4px;
  margin-left: 1px;

  border-radius: 0 2px 2px 0;

  ${props => backgroundMixin(props.bgColor)}
`;
