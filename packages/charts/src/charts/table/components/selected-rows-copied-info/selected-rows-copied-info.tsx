import React from 'react';

import { colors } from '@keen.io/colors';
import { BodyText } from '@keen.io/typography';

import {
  SelectedRowsCopiedBox,
  SelectedRowsCopiedWrapper,
} from './selected-rows-copied-info.styles';

export const SelectedRowsCopiedInfo = () => {
  return (
    <SelectedRowsCopiedWrapper>
      <SelectedRowsCopiedBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <BodyText variant="body2" color={colors.black[500]}>
          Data copied!
        </BodyText>
      </SelectedRowsCopiedBox>
    </SelectedRowsCopiedWrapper>
  );
};
