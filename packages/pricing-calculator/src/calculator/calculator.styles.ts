import styled, { css } from 'styled-components';
import { colors } from '@keen.io/colors';

export const Title = styled.div`
  font-size: 20px;
  font-family: 'Gangster Grotesk Bold', sans-serif;
  line-height: 24px;
  color: ${colors.black['500']};
  margin-top: 5px;
`;

export const Label = styled.div`
  width: 70px;
  font-size: 16px;
  font-family: 'Lato Regular', sans-serif;
  line-height: 19px;
  color: ${colors.black['300']};
`;

export const SliderContainer = styled.div`
  width: 100%;
`;

export const Wrapper = styled.div<{
  layout: 'column' | 'row';
}>`
  display: flex;

  ${props =>
    props.layout === 'column' &&
    css`
      flex-direction: column;
      height: 90px;

      & + & {
        margin-top: 20px;
      }

      ${Label} {
        margin-bottom: 25px;
      }
    `}

  ${props =>
    props.layout === 'row' &&
    css`
      flex-direction: row;
      height: 120px;

      &:nth-child(1) {
        margin-top: 70px;
      }

      ${SliderContainer} {
        box-sizing: border-box;
        padding: 0 10px;
        margin-top: 5px;
      }
    `}
`;

export const ComputeSection = styled.div`
  margin-top: 25px;
`;

export const ServicesSection = styled.div`
  padding-top: 20px;
`;
