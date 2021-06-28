import React, { FC } from 'react';
import { transparentize } from 'polished';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import { Header, CaretDown } from './font-size.styles';

import AttributeDropdown from '../attribute-dropdown';
import Option from '../option';

type Props = {
  /** Current font size */
  currentFontSize: number;
  /** Update font size event handler */
  onUpdateFontSize: (fontSize: number) => void;
  /** Font sizes that will be available inside dropdown */
  fontSizeSuggestions: number[];
};

const FontSize: FC<Props> = ({
  currentFontSize,
  onUpdateFontSize,
  fontSizeSuggestions,
}) => (
  <AttributeDropdown
    renderHeader={() => (
      <Header data-testid="font-size-header">
        {currentFontSize}
        <CaretDown>
          <Icon
            type="caret-down"
            width={10}
            height={10}
            fill={transparentize(0.3, colors.blue[500])}
          />
        </CaretDown>
      </Header>
    )}
  >
    {fontSizeSuggestions.map((fontSize) => (
      <Option
        key={fontSize}
        isActive={currentFontSize === fontSize}
        onClick={() => onUpdateFontSize(fontSize)}
      >
        {fontSize}
      </Option>
    ))}
  </AttributeDropdown>
);

export default FontSize;
