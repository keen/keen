import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Title = styled.div`
  font-size: 20px;
  font-family: 'Gangster Grotesk Bold', sans-serif;
  line-height: 24px;
  color: ${colors.black['500']};
`;

export const Label = styled.div`
  width: 70px;
  font-size: 16px;
  font-family: 'Lato Regular', sans-serif;
  line-height: 19px;
  color: ${colors.black['300']};
`;

export const SliderWrapper = styled.div`
  display: flex;
  height: 80px;
`;

export const ComputeSection = styled.div`
  margin-top: 25px;
`;

export const ServicesSection = styled.div`
  padding-top: 20px;
`;
