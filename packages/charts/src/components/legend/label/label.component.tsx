import React, { FC, useState } from 'react';

import { Typography, Text } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import { StyledLabel, Wrapper, Circle } from './label.styles';

type Props = {
  typography: Typography;
  markColor: string;
  onClick: (disabled: boolean) => void;
  text?: string | boolean;
  truncate?: number;
};

const Label: FC<Props> = ({
  text,
  markColor,
  onClick,
  typography,
  truncate = 20,
}) => {
  const [disabled, setDisable] = useState(false);
  const label = text.toString();
  return (
    <StyledLabel
      onClick={() => {
        onClick(!disabled);
        setDisable(!disabled);
      }}
    >
      <Wrapper
        role="button"
        title={label}
        style={{ opacity: disabled ? 0.6 : 1 }}
      >
        <Circle background={disabled ? colors.gray[400] : markColor} />
        <Text {...typography}>
          {label && label.length > truncate
            ? `${label.slice(0, truncate)}...`
            : label}
        </Text>
      </Wrapper>
    </StyledLabel>
  );
};

export default Label;
