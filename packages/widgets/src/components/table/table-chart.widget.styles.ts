import styled from 'styled-components';

export const HeaderContainer = styled.div<{ padding: number }>`
  padding: ${(props) => (props.padding !== undefined ? props.padding : 20)}px;
`;
