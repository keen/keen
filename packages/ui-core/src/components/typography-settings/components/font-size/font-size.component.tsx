import React, { FC } from 'react';
import { transparentize } from 'polished';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import { Header, CaretDown } from './font-size.styles';

import AttributeDropdown from '../attribute-dropdown';
import Option from '../option';
import { BodyText } from '@keen.io/typography';

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
        <BodyText variant="body2" color={colors.blue[500]}>
          {currentFontSize}
        </BodyText>
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
        <BodyText variant="body2">{fontSize}</BodyText>
      </Option>
    ))}
  </AttributeDropdown>
);

export default FontSize;
