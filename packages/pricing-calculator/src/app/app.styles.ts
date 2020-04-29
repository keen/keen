import styled, { css } from 'styled-components';

import { Device } from '../types';

export const OffsetCard = styled.div`
  background: #f5f6f8;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px 0px rgba(29, 39, 41, 0.15);
`;

export const Aside = styled.aside``;

export const Content = styled.div``;

export const Layout = styled.div<{
  device: Device;
}>`
  display: flex;

  ${props =>
    props.device === 'desktop' &&
    css`
      flex-direction: row;
      justify-content: flex-end;

      ${Content} {
        padding: 10px 30px;
        margin-right: auto;
        height: 545px;
        flex-grow: 1;
      }

      ${Aside} {
        position: relative;
        width: 320px;
        justify-self: end;
      }

      ${OffsetCard} {
        position: absolute;
        top: -50px;
        left: 25px;
        padding: 30px 0 65px 0;
        height: 645px;
      }
    `}

  ${props =>
    props.device === 'mobile' &&
    css`
      flex-direction: column;

      ${Aside} {
        width: 100%;
        padding: 0 20px;
        margin-top: -50px;
        box-sizing: border-box;
      }

      ${Content} {
        padding: 10px 10px 60px 10px;
      }

      ${OffsetCard} {
        padding: 20px 0;
      }
    `}
`;
