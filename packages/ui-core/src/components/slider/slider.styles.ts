import styled from 'styled-components';

export const Tooltip = styled.div<{
  type: 'top' | 'left' | 'right' | 'bottom';
  size: number;
}>`
  background: #2F3E42;
  color: #fff;
  font-size: 11px;
  font-family: Lato Regular;
  padding: 5px;
  position: absolute;
  width: 30px;
  text-align: center;

  ${props =>
    props.type === 'top' &&
    `
      bottom: ${props.size + 10}px;
      left: ${props.size / 2 - 20}px;
    `}

  ${props =>
    props.type === 'left' &&
    `
      right: ${props.size + 10}px;
      top: ${props.size / 2 - 11}px;
    `}

  ${props =>
    props.type === 'right' &&
    `
      left: ${props.size + 10}px;
      top: ${props.size / 2 - 11}px;
    `}

  ${props =>
    props.type === 'bottom' &&
    `
      top: ${props.size + 10}px;
      left: ${props.size / 2 - 20}px;
    `}

  &:after, &:before {
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;

    ${props =>
      props.type === 'top' &&
      `
        border-width: 5px;
        top: 100%;
        left: 50%;
        border-top-color: #2F3E42;
        margin-left: -5px;
      `}

    ${props =>
      props.type === 'left' &&
      `
        border-width: 5px;
        top: 25%;
        left: 100%;
        border-left-color: #2F3E42;
      `}

    ${props =>
      props.type === 'right' &&
      `
        border-width: 5px;
        top: 25%;
        right: 100%;
        border-right-color: #2F3E42;
        margin-left: -5px;
      `}

    ${props =>
      props.type === 'bottom' &&
      `
        border-width: 5px;
        bottom: 100%;
        left: 50%;
        border-bottom-color: #2F3E42;
        margin-left: -5px;
      `}
`;
