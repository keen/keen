import styled from 'styled-components';

export const Group = styled.g<{
  color: string;
}>`
  fill: ${(props) => props.color};
`;
