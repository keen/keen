import styled from 'styled-components';

export const Container = styled.div`
  overflow: hidden;
  outline: none;
`;

// kiedy overflow ale kolorow jest wystarczajaco to nie moze byc inline-flex

export const Layout = styled.div`
  padding: 15px;
  display: grid;
  gap: 8px 10px;
  grid-auto-flow: column;
  -webkit-box-pack: start;
  justify-content: flex-start;
  position: relative;

  overflow: hidden;
  
`;
