import React, { FC, RefObject } from 'react';
import { transparentize } from 'polished';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import { Header, CaretDown } from './text-alignment.styles';

import AttributeDropdown from '../attribute-dropdown';
import Option from '../option';

import { ICON, OPTIONS } from './constants';

type Props = {
  /** Current font size */
  currentAlignment: 'left' | 'center' | 'right';
  /** Update font size event handler */
  onUpdateTextAlignment: (fontSize: string) => void;
  /** Ref to scrollable parent element - it can be used to hide dropdown on scroll event */
  scrollableContainerRef?: RefObject<HTMLDivElement>;
};

const TextAlignment: FC<Props> = ({
  currentAlignment,
  onUpdateTextAlignment,
  scrollableContainerRef,
}) => (
  <AttributeDropdown
    scrollableContainerRef={scrollableContainerRef}
    renderHeader={() => (
      <Header data-testid="text-alignment-header">
        <Icon
          type={ICON[currentAlignment]}
          fill={colors.black[100]}
          width={13}
          height={13}
        />
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
    {OPTIONS.map(({ id, icon, style }) => (
      <Option
        key={id}
        data-testid={`option-${style}`}
        onClick={() => onUpdateTextAlignment(style)}
        isActive={currentAlignment === style}
      >
        <Icon type={icon} fill={colors.black[100]} width={13} height={13} />
      </Option>
    ))}
  </AttributeDropdown>
);

export default TextAlignment;
