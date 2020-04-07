import styled from 'styled-components';

export const Layout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Content = styled.div`
  margin-right: auto;
  flex-grow: 1;
`;

export const Aside = styled.aside`
  position: relative;
  width: 320px;
  justify-self: end;
`;

export const OffsetCard = styled.div`
  background: #f5f6f8;
  width: 100%;
  height: auto;
  padding: 30px 0 65px 0;
  top: -50px;
  left: 25px;
  position: absolute;
  box-shadow: 0px 2px 4px 0px rgba(29, 39, 41, 0.15);
`;
