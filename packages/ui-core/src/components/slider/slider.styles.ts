import styled from 'styled-components';

export const TickContainer = styled.div<{
  left: number;
  controlSize: number;
  type: 'horizontal' | 'vertical';
}>`
  position: absolute;
  width: 30px;

  ${props =>
    props.type === 'horizontal' &&
    `
    top: ${props.controlSize + 2}px;
    left: ${props.left + props.controlSize / 2 - 20}px;
    `}

  ${props =>
    props.type === 'vertical' &&
    `
    left: ${props.controlSize + 2}px;
    top: ${props.left + props.controlSize / 2 - 12}px;
    `}
`;

export const Tick = styled.div<{
  type: 'horizontal' | 'vertical';
}>`
  position: absolute;
  background: #4f5b5f;

  ${props =>
    props.type === 'horizontal' &&
    `
    top: 0px;
    left: 50%;
    width: 1px;
    height: 5px;
    `}

  ${props =>
    props.type === 'vertical' &&
    `
    top: 50%;
    left: 0px;
    width: 5px;
    height: 1px;
    `}
`;

export const Label = styled.div<{
  type: 'horizontal' | 'vertical';
}>`
  font-family: Lato Regular;
  font-size: 12px;
  color: #4f5b5f;

  ${props =>
    props.type === 'horizontal' &&
    `
      text-align: center;
      margin-top: 10px;
    `}

  ${props =>
    props.type === 'vertical' &&
    `
      text-align: left;
      margin-left: 10px;
    `}
`;

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
