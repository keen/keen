import styled from 'styled-components';
import { variant } from 'styled-system';
import { Placement } from 'react-toast-notifications';

import { UI_LAYERS } from '@keen.io/ui-core';

const containerVariants = {
  prop: 'placement',
  variants: {
    'top-center': {
      alignItems: 'center',
      top: '100px',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    'bottom-center': {
      alignItems: 'center',
      bottom: '100px',
      left: '50%',
      transform: 'translateX(-50%)',
    },
  },
};

export const Container = styled.div<{ placement: Placement }>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  z-index: ${UI_LAYERS.notification};

  ${variant(containerVariants)};
`;
