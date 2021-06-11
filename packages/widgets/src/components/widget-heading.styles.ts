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
  marginTop: boolean;
  marginLeft: boolean;
}>`
  ${(props) =>
    props.marginTop &&
    css`
      margin-top: 5px;
    `}
  ${(props) =>
    props.marginLeft &&
    css`
      margin-left: 5px;
    `}
`;
