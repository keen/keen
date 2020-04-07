import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Summary = styled.div`
  padding: 20px 15px;
  margin: 20px 0;
  width: 100%;
  box-sizing: border-box;
  background: ${colors.green['400']};
`;

export const Currency = styled.div`
  color: ${colors.white['500']}
  font-size: 24px;
  font-family: 'Gangster Grotesk Bold', sans-serif;
`;

export const BillingPeriod = styled.div`
color: ${colors.white['500']}
font-size: 24px;
line-height: 54px;
opacity: 0.5;
font-family: 'Gangster Grotesk Bold', sans-serif;
margin-left: 5px;
`;

export const Total = styled.div`
  margin: 25px 0 20px 0;
  display: flex;
  justify-content: center;
  color: ${colors.white['500']}
  font-size: 24px;
  font-family: 'Gangster Grotesk Bold', sans-serif;
`;

export const Price = styled.div`
  font-size: 40px;
  line-height: 54px;
  color: ${colors.white['500']}
  font-family: 'Gangster Grotesk Bold', sans-serif;
`;

export const Label = styled.div`
  margin-right: 10px;
  font-family: 'Lato Regular', sans-serif;
  font-size: 14px;
  line-height: 17px;
  color: ${colors.white['500']}
  cursor: pointer;
`;

export const BllingMode = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
