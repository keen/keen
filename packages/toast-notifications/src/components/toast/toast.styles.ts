import styled from 'styled-components';
import { variant } from 'styled-system';
import { AppearanceTypes } from 'react-toast-notifications';

const toastVariants = {
  prop: 'appearance',
  variants: {
    error: {
      background: 'red',
    },
    info: {
      background: 'blue',
    },
    success: {
      background: 'green',
    },
    warining: {
      background: 'yellow',
    },
  },
};

export const Container = styled.div<{ appearance: AppearanceTypes }>`
  padding: 20px 30px;

  ${variant(toastVariants)};
`;
