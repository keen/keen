import React from 'react';
import { colors } from '@keen.io/colors';
import { BodyText } from '@keen.io/typography';

import {
  SelectedRowsWrapper,
  SelectedRowsBox,
  SelectedRowsCount,
  Clear,
  Copy,
} from './selected-rows-info.styles';

type Props = {
  selectedRowsNumber: number;
  onClearRowsSelection: () => void;
  onCopySelectedRows: () => void;
};
export const SelectedRowsInfo = ({
  selectedRowsNumber,
  onClearRowsSelection,
  onCopySelectedRows,
}: Props) => {
  return (
    <SelectedRowsWrapper>
      <SelectedRowsBox>
        <SelectedRowsCount>
          <BodyText variant="body2">
            {selectedRowsNumber} {selectedRowsNumber > 1 ? 'rows' : 'row'}{' '}
            selected
          </BodyText>
        </SelectedRowsCount>
        <Clear onClick={onClearRowsSelection} data-testid="clear-selection-btn">
          <BodyText variant="body2" fontWeight="bold" color={colors.blue[500]}>
            Clear
          </BodyText>
        </Clear>
        <Copy onClick={onCopySelectedRows} data-testid="copy-selection-btn">
          <BodyText variant="body2" fontWeight="bold" color={colors.white[500]}>
            Copy Data
          </BodyText>
        </Copy>
      </SelectedRowsBox>
    </SelectedRowsWrapper>
  );
};
