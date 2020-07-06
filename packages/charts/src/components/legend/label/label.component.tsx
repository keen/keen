import React, { FC, useState } from 'react';

import { Typography, Text } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import { StyledLabel, Wrapper, Circle } from './label.styles';

type Props = {
  typography: Typography;
  markColor: string;
  onClick: (disabled: boolean) => void;
  text?: string;
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

  return (
    <StyledLabel
      onClick={() => {
        onClick(!disabled);
        setDisable(!disabled);
      }}
    >
      <Wrapper
        role="button"
        title={text}
        style={{ opacity: disabled ? 0.6 : 1 }}
      >
        <Circle background={disabled ? colors.gray[400] : markColor} />
        {text && (
          <Text {...typography}>
            {text.length > truncate ? `${text.slice(0, truncate)}...` : text}
          </Text>
        )}
      </Wrapper>
    </StyledLabel>
  );
};

export default Label;
