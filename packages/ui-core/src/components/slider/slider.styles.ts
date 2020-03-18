import styled from 'styled-components';

export const Tooltip = styled.div<{ left: number }>`
  background: #2F3E42;
  color: #fff;
  font-size: 11px;
  font-family: Lato Regular;
  padding: 5px;
  position: absolute;
  top: 17px;
  left: ${props => props.left - 18}px;
  width: 30px;
  text-align: center;

  &:after, &:before {
    bottom: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-bottom-color: #2F3E42;
    border-width: 5px;
    margin-left: -5px;
`;
