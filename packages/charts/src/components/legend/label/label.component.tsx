import React, { FC, useState } from 'react';

import { Typography, Text } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import { StyledLabel, Wrapper, Circle } from './label.styles';

type Props = {
  typography: Typography;
  markColor: string;
  onClick: (disabled: boolean, label: string) => void;
  onMouseEnter?: (label: string) => void;
  onMouseLeave?: (label: string) => void;
  text?: string | boolean;
  maxWidth?: number;
  isDisabled?: boolean;
};

const Label: FC<Props> = ({
  text,
  markColor,
  onClick,
  onMouseEnter,
  onMouseLeave,
  typography,
  maxWidth,
  isDisabled = false,
}) => {
  const [disabled, setDisable] = useState(isDisabled);
  const label = `${text}`;
  return (
    <StyledLabel
      onClick={() => {
        onClick(!disabled, label);
        setDisable(!disabled);
      }}
      onMouseEnter={() => !disabled && onMouseEnter(label)}
      onMouseLeave={() => onMouseLeave(label)}
    >
      <Wrapper
        role="button"
        title={label}
        maxWidth={maxWidth}
        style={{ opacity: disabled ? 0.6 : 1 }}
      >
        <Circle background={disabled ? colors.gray[400] : markColor} />
        <Text {...typography} truncate>
          {label}
        </Text>
      </Wrapper>
    </StyledLabel>
  );
};

export default Label;
