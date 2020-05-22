import styled from 'styled-components';

export const Layout = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  justify-content: space-between;
  flex-direction: row;
`;

export const ValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const Excerpt = styled.div<{
  background: string;
}>`
  margin-top: 10px;
  display: inline-block;
  padding: 5px 10px;
  background: ${props => props.background};
`;

export const IconWrapper = styled.div`
  margin-right: 5px;
  display: flex;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TextWrapper = styled.div`
  display: flex;
  align-items: baseline;
`;
