import styled from 'styled-components';

export const Group = styled.g<{
  color: string;
}>`
  color: ${props => props.color};
`;
