import styled from 'styled-components';

export const HeaderContainer = styled.div<{ padding: number }>`
  padding: ${(props) => (props.padding ? props.padding : 20)}px;
`;
