import React, { FC } from 'react';
import { transparentize } from 'polished';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import { Header, CaretDown } from './font-size.styles';

import AttributeDropdown from '../attribute-dropdown';
import Option from '../option';

import { OPTIONS } from './constants';

type Props = {
  /** Current font size */
  currentFontSize: string;
  /** Update font size event handler */
  onUpdateFontSize: (fontSize: string) => void;
};

const FontSize: FC<Props> = ({ currentFontSize, onUpdateFontSize }) => (
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
    {OPTIONS.map((fontSize) => (
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
