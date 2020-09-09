import styled from 'styled-components';
import { variant } from 'styled-system';
import { transparentize } from 'polished';
import { AppearanceTypes } from 'react-toast-notifications';
import { colors } from '@keen.io/colors';

const toastVariants = {
  prop: 'appearance',
  variants: {
    error: {
      background: transparentize(0.05, colors.red[500]),
    },
    info: {
      background: transparentize(0.05, colors.blue[200]),
    },
    success: {
      background: transparentize(0.05, colors.green[500]),
    },
  },
};

export const Container = styled.div<{ appearance: AppearanceTypes }>`
  display: inline-block;
  margin-bottom: 10px;
  max-width: 500px;
  box-shadow: rgba(0, 0, 0, 0.176) 0px 3px 8px;
  ${variant(toastVariants)};
`;

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 30px;
  min-height: 59px;
`;

export const Content = styled.div`
  padding: 10px 0;
  font-family: 'Lato Regular', sans-serif;
  font-size: 16px;
  line-height: 19px;
  color: ${colors.white[500]};
`;

export const DismissButton = styled.div`
  margin-left: 30px;
  border: 1px solid ${colors.white[500]};
  border-radius: 18.5px;
  box-sizing: border-box;
  padding: 0 25px;
  height: 37px;
  display: flex;
  align-items: center;

  color: ${colors.white[500]};
  font-family: 'Lato Bold', sans-serif;
  font-size: 14px;
  cursor: pointer;
`;
