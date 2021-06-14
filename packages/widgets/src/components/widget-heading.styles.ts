import styled, { css } from 'styled-components';

export const Container = styled.div`
  margin-bottom: 5px;
`;

export const Heading = styled.div`
  margin-bottom: 5px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TagContainer = styled.div<{
  marginTop: number;
  marginLeft: number;
}>`
  ${(props) =>
    css`
      margin-top: ${props.marginTop}px;
    `}
  ${(props) =>
    css`
      margin-left: ${props.marginLeft}px;
    `}
`;
