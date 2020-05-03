import styled from 'styled-components';

export const List = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
`;

export const IconSocket = styled.div`
  margin-right: 7px;
  display: flex;
  align-items: center;
`;

export const Item = styled.li<{
  color: string;
}>`
  display: flex;
  align-items: center;
  flex-basis: 50%;
  margin-bottom: 10px;
  font-family: 'Lato Regular', sans-serif;
  color: ${props => props.color};
  font-size: 12px;
  line-height: 14px;

  transition: color 0.1s linear;
`;
