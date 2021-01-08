import styled from 'styled-components';

export const Container = styled.div<{
  backgroundColor: string;
}>`
  display: flex;
  text-align: left;
  background: inherit;
  background: ${(props) => props.backgroundColor};
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  min-height: 20px;
  padding: 20px;
`;
