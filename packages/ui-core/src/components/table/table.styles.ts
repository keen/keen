import styled, { css } from 'styled-components';

export const Sticky = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
`;

export const StyledHeaderCeil = styled.div<{
  width: number;
}>`
  color: #fff;
  font-size: 14px;
  line-height: 17px;
  text-align: left;
  font-family: Gangster Grotesk Bold;
  white-space: nowrap;

  ${props =>
    props.width &&
    css`
      width: ${props.width}px;
    `}
`;

export const StyledCeil = styled.div<{
  type: string;
}>`
  color: #1d2729;
  font-size: 14px;
  line-height: 17px;
  text-align: left;
  padding: 12px 20px;
  font-family: Lato Regular;
  position: relative;

  ${props =>
    props.type === 'number' &&
    css`
      text-align: right;
    `}
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
`;

export const UpArrow = styled.div<{
  opacity: number;
}>`
  opacity: ${props => props.opacity};
`;

export const DownArrow = styled.div<{
  opacity: number;
}>`
  opacity: ${props => props.opacity};
  position: relative;
  top: 5px;
  left: -1px;
`;
