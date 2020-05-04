import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;
`;

export const ErrorContainer = styled.div`
  min-height: 15px;
  margin-top: 3px;
`;

export const CompanyDisclaimer = styled.label`
  margin-top: 5px;
  font-size: 12px;
  font-family: 'Lato Regular', sans-serif;
  color: ${colors.blue['500']};
`;

export const CompanyMessage = styled.span`
  margin-left: 5px;
`;

export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
`;

export const Text = styled.div`
  margin-right: 10px;
`;

export const Footer = styled.div`
  margin-top: 15px;
`;

export const PasswordHints = styled.div`
  margin-top: 15px;
`;
